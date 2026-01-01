"use client";

import { useState, useEffect } from "react";

export default function useBaseUrl(url: string) {
    const [fullUrl, setFullUrl] = useState(url);

    useEffect(() => {
        if (url && window.location.hostname === "localhost") {
            setFullUrl(`http://localhost:1337${url}`);
        } else {
            setFullUrl(url);
        }
    }, [url]);

    return fullUrl;
}