import { css } from '@emotion/react';

export const ellipsis = (line = 1) =>
  line === 1
    ? css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 0;
      `
    : css`
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: ${line};
        -webkit-box-orient: vertical;
      `;
