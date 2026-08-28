import { cloneElement, useId } from "react";

/**
 * A labelled form control with its hint and its error wired up.
 *
 * The control is passed as a single child element and receives `id`,
 * `aria-invalid` and `aria-describedby` from here — so the hint and the error
 * are actually announced, rather than just sitting near the input looking
 * related. Errors replace hints: showing both at once is noise at the exact
 * moment the reader needs one clear instruction.
 */
export default function Field({
  label,
  icon: Glyph,
  error,
  hint,
  required = false,
  children,
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink"
      >
        {Glyph && <Glyph className="size-4 text-vermillion" aria-hidden="true" />}
        {label}
        {required && (
          <span className="text-vermillion" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {cloneElement(children, {
        id,
        "aria-invalid": error ? "true" : undefined,
        "aria-describedby": describedBy,
        required: required || undefined,
      })}

      {error ? (
        <p id={errorId} className="mt-1.5 font-mr-ui text-sm text-vermillion">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-ink/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
