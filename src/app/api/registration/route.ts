import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { registrationSchema, type RegistrationPayload } from "@/lib/registration";
import { enqueueRegistration, triggerNotificationHooks } from "@/server/registration-queue";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    console.error("registration payload parse error", error);
    return NextResponse.json(
      { errors: { form: "Invalid payload. Please refresh and try again." } },
      { status: 400 }
    );
  }

  const parsed = registrationSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.issues.reduce<Record<string, string>>((acc, issue) => {
      const key = (issue.path[0] as string) ?? "form";
      if (!acc[key]) {
        acc[key] = issue.message;
      }
      return acc;
    }, {});

    return NextResponse.json({ errors }, { status: 400 });
  }

  const data = parsed.data;
  const sanitized: RegistrationPayload = {
    ...data,
    trainingFocus: data.addTraining ? data.trainingFocus : undefined,
    trainerPreference: data.addTraining ? data.trainerPreference : undefined,
    availability: data.addTraining ? data.availability : undefined,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  enqueueRegistration(sanitized);
  triggerNotificationHooks(sanitized);

  return NextResponse.json({ success: true, id: sanitized.id });
}
