import _get from "lodash/get"

/*
 * This function builds out a Date using regaulr JS (not moment.js)
 */
export const formatDate = date => {
    // Safari doesn't like the default WP-GQL date format, so need to replace the space with a T
    // See: https://stackoverflow.com/questions/21883699/safari-javascript-date-nan-issue-yyyy-mm-dd-hhmmss
    const d = new Date(date.replace(/\s/, "T"))
    const year = d.getFullYear()
    const month = d.toLocaleString("en-us", { month: "long" })

    const day = d
        .getDate()
        .toString()
        .padStart(2, "0")

    return `${month} ${day}, ${year}`
}

/*
 * This function is used to decode HTML entities. Useful for setting head title tags.
 * Will convert ``&amp;#8211;`` into `-` for example.
 */
export const decodeHtmlEntities = string => {
    return string.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec)
    })
}

/*
 * This function is used generate "share this" style links.
 */
export const buildShareLinks = opts => {
    const url = opts.url || ""
    const text = opts.text.replace(/<[^>]*>?/gm, "") || ""

    const title = opts.title || ""

    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
        )}`,
        twitter: `http://twitter.com/share?text=${encodeURIComponent(
            text.substring(0, 280)
        )}&url=${encodeURIComponent(url)}`,
        tumblr: `http://www.tumblr.com/share/link?url=${encodeURIComponent(
            url
        )}`,
        reddit: `http://www.reddit.com/submit?url=${url}&title=${encodeURIComponent(
            title
        )}`,
        email: `mailto:?subject=${encodeURIComponent(
            title
        )}&body=${encodeURIComponent(text)}%0D%0A %0D%0A${encodeURIComponent(
            url
        )}`,
        linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            url
        )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
            text
        )}`,
        pinterest: `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
        )}&description=${encodeURIComponent(text)}`
    }
}

/*
 * Take array of items and sort equally across n new arrays. Great for sorting items into columns.
 */
export const sortColumns = (items, count = 2) => {
    const buckets = Array(count)
        .fill(0)
        .map(v => [])
    let pointer = 0

    items.forEach(item => {
        buckets[pointer].push(item)
        pointer = (pointer + 1) % count
    })

    return buckets
}

/*
 * Mimics PHP's nl2br
 * SEE https://www.php.net/manual/en/function.nl2br.php
 */
export const nl2br = str => {
    return str.replace(/(?:\r\n|\r|\n)/g, "<br>")
}

/*
 * This function does a lodash _get, but removes HTML tags from the string.
 * Useful for setting head() description tags.
 */
export function getStripped(obj, path, def = undefined) {
    const text = _get(obj, path, def)
        ? stripTags(_get(obj, path, def))
        : undefined
    return text
}

/*
 * Takes a string and stipes HTML tags from it
 */
export const stripTags = str => {
    return str.replace(/<[^>]*>?/gm, "")
}
