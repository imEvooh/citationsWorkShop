"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useFormStatus } from "react-dom";
import { createCitationAction, updateCitationAction } from "./citations.action";
import { Citation } from "@/generated/prisma";

export function CitationForm(props: {citation?: Citation;}) {

    const onSubmit = async (FormData: FormData) => {
        let error: null | string = null;

        if (props.citation) {
            const json = await updateCitationAction(
                props.citation.id, {
                author: String(FormData.get("author")),
                text: String(FormData.get("text")),
            });
            error = json.error;
        } else {
            const json = await createCitationAction({
                author: String(FormData.get("author")),
                text: String(FormData.get("text")),
            });
            error = json.error;
        }
        if (error)
            alert(error);
    };

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>
                    {props.citation ? "Update" : "Create"} Citation
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    action={async (formData) => { await onSubmit(formData);}}
                    className="flex flex-col gap-2"
                >
                    <Label>
                        Citation
                        <Input defaultValue={props.citation?.text} name="text"/>
                    </Label>
                    <Label>
                        Author
                        <Input defaultValue={props.citation?.author} name="author"/>
                    </Label>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}

const SubmitButton = () => {
    const {pending} = useFormStatus();

    return (
        <Button disabled={pending} type="submit">{ pending ? "Loading..." : "Submit"}</Button>
    );
}