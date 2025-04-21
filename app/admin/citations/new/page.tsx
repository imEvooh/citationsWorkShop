"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useFormStatus } from "react-dom";
import { createCitationAction } from "../citations.action";
import { CitationForm } from "../citation-form";

export default function Page() {

    return (
        <CitationForm />
    );
}

const SubmitButton = () => {
    const {pending} = useFormStatus();

    return (
        <Button disabled={pending} type="submit">{ pending ? "Loading..." : "Submit"}</Button>
    );
}