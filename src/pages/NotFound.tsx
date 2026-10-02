import { Button } from "../components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <img src="/orbit.svg" alt="" className="size-16 rounded-2xl" />
      <p className="eyebrow mt-8">404 · Off orbit</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">This page drifted away</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        The page you're looking for isn't in the Oribitron index. Head back to the model directory and pick up a new
        trajectory.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/models">Browse the directory</Button>
        <Button to="/" variant="outline">
          Back home
        </Button>
      </div>
    </div>
  );
}
