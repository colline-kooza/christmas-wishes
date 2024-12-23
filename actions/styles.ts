"use server";

import { CardCustomization } from "@/lib/types";
import { db } from "@/prisma/db";

export async function createStyle(style: CardCustomization, userId: string, userName: string) {
    console.log({
        ...style,
        userId,
        userName,
      })
  try {
    const newStyle = await db.style.create({
      data: {
        ...style,
        userId,
        userName,
      },
    });
    return newStyle;
  } catch (error) {
    console.error("Error creating style:", error);
    throw new Error("Failed to create style. Please try again later.");
  }
}

export async function getStyle(id: string) {
  try {
    const style = await db.style.findUnique({
      where: { id },
    });

    if (!style) {
      throw new Error("Style not found.");
    }

    return style;
  } catch (error) {
    console.error("Error fetching style:", error);
    throw new Error("Failed to fetch style. Please try again later.");
  }
}
