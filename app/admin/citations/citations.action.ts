"use server";

import {prisma} from '@/src/lib/prisma'
import { redirect } from 'next/navigation';

export async function createCitationAction(citation: { text: string, author: string,}) {

    try {
        const newCitation = await prisma.citation.create({
                data: {
                    author: citation.author,
                    text: citation.text,
                }
        });
    } catch {
        return {
            error: "Error while creating the citation.",
        }
    }
    redirect("/admin");
}

export async function deleteCitationAction(id: number) {
   await prisma.citation.delete({
        where: {
            id,
        }
    });

    return {
        message: "Citation deleted successfully.",
    }
}

export async function updateCitationAction(id: number, citation: { text: string, author: string,}) {

    try {
        const updatedCitation = await prisma.citation.update({
            where: {
                id,
            },
            data: {
                    author: citation.author,
                    text: citation.text,
                }
        });
    } catch {
        return {
            error: "Error while creating the citation.",
        }
    }
    redirect("/admin");
}