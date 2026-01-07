"use client";

import { useState, useEffect } from "react";

export default function useBaseUrl(url: string) {
    const [fullUrl, setFullUrl] = useState(url);

    useEffect(() => {
        if (!url?.includes("https") && typeof window !== "undefined" && window.location.hostname === "localhost") {
            setFullUrl(`http://localhost:1337${url}`);
        } else {
            setFullUrl(url);
        }
    }, [url]);

    return fullUrl;
}