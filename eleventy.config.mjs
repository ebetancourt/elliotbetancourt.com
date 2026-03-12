import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import esbuild from "esbuild";
import path from "path";

export const config = {
    dir: {
        input: "site",
    },
};

export default function (eleventyConfig) {
    // Input directory: site
    // Output directory: _site

    // Add posts collection from blog directory
    eleventyConfig.addCollection("posts", collection => {
        return collection.getFilteredByGlob("site/blog/**/*.md").sort((a, b) => {
            return b.date - a.date; // Sort by date, newest first
        });
    });

    // The following copies to `_site/images`
    eleventyConfig.addPassthroughCopy("site/images");
    eleventyConfig.addPassthroughCopy("site/css");
    eleventyConfig.addPassthroughCopy("site/resources/files");

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // output image widths
        widths: ["auto"],

        // optional, attributes assigned on <img> nodes override these values
        htmlOptions: {
            imgAttributes: {
                loading: "lazy",
                decoding: "async",
            },
            pictureAttributes: {},
        },
    });

    // Add JSX/TSX template engine support
    eleventyConfig.addExtension(["jsx", "tsx"], {
        key: "jsx",
        compile: async function (inputContent, inputPath) {
            return async function (data) {
                try {
                    const result = await esbuild.build({
                        stdin: {
                            contents: inputContent,
                            resolveDir: path.dirname(inputPath),
                            sourcefile: inputPath,
                            loader: path.extname(inputPath) === '.tsx' ? 'tsx' : 'jsx',
                        },
                        format: "cjs",
                        target: "node16",
                        jsx: "transform",
                        jsxFactory: "createElement",
                        jsxFragment: "Fragment",
                        bundle: false,
                        write: false,
                        loader: {
                            '.jsx': 'jsx',
                            '.tsx': 'tsx',
                        },
                    });

                    const code = result.outputFiles[0].text;
                    
                    // Create a simple JSX to HTML renderer
                    const createElement = (tag, props, ...children) => {
                        if (typeof tag === 'function') {
                            return tag({ ...props, children: children.flat() });
                        }
                        
                        const flatChildren = children.flat().filter(child => child != null);
                        const childrenStr = flatChildren.join('');
                        
                        if (!props) {
                            return `<${tag}>${childrenStr}</${tag}>`;
                        }
                        
                        const propsStr = Object.entries(props || {})
                            .filter(([key, value]) => value != null && key !== 'children')
                            .map(([key, value]) => {
                                if (key === 'className') key = 'class';
                                return `${key}="${String(value).replace(/"/g, '&quot;')}"`;
                            })
                            .join(' ');
                        
                        return `<${tag}${propsStr ? ' ' + propsStr : ''}>${childrenStr}</${tag}>`;
                    };
                    
                    const Fragment = ({ children }) => Array.isArray(children) ? children.join('') : children;
                    
                    // Execute the compiled code in a safe context
                    const module = { exports: {} };
                    const func = new Function('module', 'exports', 'createElement', 'Fragment', 'data', code);
                    func(module, module.exports, createElement, Fragment, data);
                    
                    const component = module.exports.default || module.exports;
                    
                    if (typeof component === 'function') {
                        return component(data);
                    }
                    
                    return component || '';
                } catch (error) {
                    console.error(`Error compiling JSX template ${inputPath}:`, error);
                    return `<div style="color: red; border: 1px solid red; padding: 1rem; margin: 1rem;">
                        <strong>JSX Compilation Error in ${inputPath}:</strong><br>
                        ${error.message}
                    </div>`;
                }
            };
        }
    });

    // Return configuration
    return {
        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "liquid",
        templateFormats: ["html", "liquid", "md", "jsx", "tsx"]
    };
}
