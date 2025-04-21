"use client";

import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { deleteCitationAction } from "./citations/citations.action";
import { useRouter } from "next/navigation";

export function DeleteCitationButton(props:  {id: number}) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const router = useRouter();

    const onDelete =  async () => {
        const result = await deleteCitationAction(props.id);

        if (result.message)
            router.refresh();
    }
    
    return (
       <Button
        size="sm"
        onClick={() => {
            if (isConfirmed)
                onDelete();
            else
                setIsConfirmed(true);
        }
       } variant={isConfirmed ? "destructive" : "outline"}>🗑️</Button>
    )
}