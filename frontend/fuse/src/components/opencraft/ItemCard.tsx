// @ts-nocheck
"use client";

import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import {
  ConceptCombinationRequest,
  postConceptCombination,
} from "@/app/conceptCombination";

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match && match[2]) {
    return decodeURIComponent(match[2]);
  }
  return null;
};

const DraggableItem = ({
  title,
  emoji,
  id,
  size,
  boxes_store,
  resources_store,
}) => {
  const { boxes, removeBox, addBox, toggleLoadingBox } = boxes_store;
  const { resources, addResource } = resources_store;

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      async drop(item) {
        if (item.id !== id) {
          const droppedId = item.id;
          const secondTitle = boxes[droppedId]?.title ?? item?.title;

          console.log(boxes);

          // Get the session_id from the cookie
          const session_id = getCookie("sessionId");
          console.log(session_id)

          if (!session_id) {
            throw new Error("Session ID not found in cookies");
          }

          const request: ConceptCombinationRequest = {
            session_id: session_id,
            first_concept: title,
            second_concept: secondTitle,
          };

          removeBox(droppedId);
          toggleLoadingBox(id);

          postConceptCombination(request)
            .then((response) => {
              removeBox(id);
              const resultAnswer = response.name;
              const resultEmoji = response.emoji;

              addBox({
                title: resultAnswer,
                emoji: resultEmoji,
                left: boxes[id].left,
                top: boxes[id].top,
                loading: false,
              });

              if (
                !resources.find((resource) => resource.title === resultAnswer)
              ) {
                addResource({
                  title: resultAnswer,
                  emoji: resultEmoji,
                });
              }
            })
            .catch((error) => {
              // Handle any errors here
              console.error("Error occurred:", error.message);
            });
        }
      },
    }),
    [boxes],
  );

  const classNames = `
    ${size === "large" ? "text-2xl space-x-2.5 py-2.5 px-4" : "space-x-1.5 px-3 py-1"}
    border-gray-200 bg-white shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg
  `.trim();

  return (
    <div ref={drop} className={classNames}>
      <span>{emoji}</span>
      <span style={{ color: "black" }}>{title}</span>
    </div>
  );
};

export default DraggableItem;
