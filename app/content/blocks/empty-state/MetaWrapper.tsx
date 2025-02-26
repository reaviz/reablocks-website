"use client";

import { Meta } from "@storybook/blocks";
import * as EmptyStateStories from "../../../stories/blocks/EmptyState.story";

export function MetaWrapper() {
  return <Meta of={EmptyStateStories} />;
}
