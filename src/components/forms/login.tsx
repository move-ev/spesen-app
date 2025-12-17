"use client";

import { authClient } from "@/server/better-auth/client";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { FieldGroup } from "../ui/field";

export function LoginForm({ ...props }: React.ComponentProps<"form">) {
  const [loading, setLoading] = React.useState(false);

  const signInMicrosoft = () => {
    setLoading(true);
    void authClient.signIn
      .social({
        provider: "microsoft",
      })
      .finally(() => setLoading(false));
  };

  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <Button
          type="button"
          variant={"outline"}
          onClick={signInMicrosoft}
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            "Mit Microsoft anmelden"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
