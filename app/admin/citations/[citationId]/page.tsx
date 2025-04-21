import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import { CitationForm } from "../citation-form";

export default async function Page(props: {
        params: Promise<{
            citationId: String;
        }>;
        searchParams: Promise<Record<string, string | string[]>>;
    })
{

    const params = await props.params;
    const citationId = params.citationId;
    const citation = await prisma.citation.findFirst({
        where: {
            id: Number(citationId),
        }});

    if (!citation) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>The citation {citationId} doesn't exist.</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    return (
        <CitationForm citation={citation} />
    );
}