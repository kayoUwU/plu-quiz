"use client";

import { useLayoutEffect } from "react";

import {BASE_PATH, INDEX_PAGE} from "@/lib/constant";

export default function Page(){
    useLayoutEffect(()=>{
        window.location.replace(BASE_PATH.concat(INDEX_PAGE));
    },[]);
    return (
        <main>
            redirecting ...
        </main>
    );
}