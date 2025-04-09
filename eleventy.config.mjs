import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export const config = {
    dir: {
        input: "site",
    },
};

export default function (eleventyConfig) {
    // Input directory: src
    // Output directory: _site

    // The following copies to `_site/images`
    eleventyConfig.addPassthroughCopy("site/images");

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
}
