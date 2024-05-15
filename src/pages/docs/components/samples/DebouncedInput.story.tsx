import React, { useState } from "react";
import { DebouncedInput } from "reablocks";

export default {
  title: "Components/Form/Debounced Input",
  component: DebouncedInput,
};

export const Basic = () => {
  const [instantInput, setInstantInput] = useState("");
  const [slowInput, setSlowInput] = useState("");
  return (
    <>
      {/* @ts-expect-error */}
      <DebouncedInput value={instantInput} onValueChange={setInstantInput} />
      Instant input value: {instantInput}
      <br />
      <DebouncedInput
        // @ts-expect-error
        value={slowInput}
        onValueChange={setSlowInput}
        debounce={500}
      />
      Delayed input value: {slowInput}
    </>
  );
};
