import { buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from "next/link";
import {prisma} from '@/src/lib/prisma'
import { DeleteCitationButton } from "./delete-citation-button";

export default async function Page() {

    const citations = await prisma.citation.findMany({
        orderBy: {
            createdAt: "desc",
        }
    })
    return (
        <Card>
            <CardHeader>
                <CardTitle>URL  : /admin</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {citations.map((citation) => (
                    <Card className="p-4 flex items-start items-center gap-4" key={citation.id}>
                        <div className="flex flex-col gap-2 items-center text-center flex-1">
                                <p className="italic text-gray-600 w-full">"{citation.text}"</p>
                                <p className="text-gray-500 w-full">- {citation.author}</p>
                        </div>
                        <div className="flex flex-col gap-2 ml-auto">
                            <DeleteCitationButton id={citation.id}/>
                            <Link className={buttonVariants({size: "lg", variant: "outline"})} href={`/admin/citations/${citation.id}`}>🖊️</Link>
                        </div>
                    </Card>
                ))}
                <Link className={buttonVariants({size: "lg", variant: "outline"})} href="/admin/citations/new">Create citation</Link>
            </CardContent>
        </Card>
    )
}