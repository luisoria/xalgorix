import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import {
  isRouteErrorResponse,
  Link,
  useRouteError,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function errorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "The interface hit an unexpected state.";
}

function errorStack(error: unknown): string {
  return error instanceof Error && error.stack ? error.stack : "";
}

export function RouteErrorBoundary() {
  const error = useRouteError();
  const message = errorMessage(error);
  const stack = errorStack(error);

  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <Card className="w-full max-w-2xl border-red-500/30 bg-card">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 text-red-300">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-red-200">
                This view could not be rendered
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                The dashboard stayed online, but this page encountered data it
                could not display.
              </p>
              <p className="mt-3 rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-foreground/90">
                {message}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2 border-t border-border pt-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RotateCcw className="h-3.5 w-3.5" />
              Reload
            </Button>
            <Button asChild>
              <Link to="/">
                <Home className="h-3.5 w-3.5" />
                Overview
              </Link>
            </Button>
          </div>

          {stack && (
            <details className="rounded-md border border-border bg-muted/20 p-3">
              <summary className="cursor-pointer text-xs text-muted-foreground">
                Error details
              </summary>
              <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words font-mono text-[11px] text-muted-foreground">
                {stack}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
