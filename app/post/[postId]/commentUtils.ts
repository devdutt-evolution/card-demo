export const transformText = (comment: string): string => {
  const matchTag = new RegExp(/@\[([^\]]+)\]\(\w+\)/, "g");

  const matched = comment.match(matchTag);

  if (matched && matched?.length > 0) {
    matched.map((str) => {
      const lastNameIndex = str.indexOf("]");
      const username = str.substring(2, lastNameIndex);
      const id = str.substring(lastNameIndex + 2, str.length - 1);
      comment = comment.replace(
        str,
        ` <span class="text-green cursor-pointer hover:underline"><a href='/user/${id}' target="_blank">@${username}</a></span>`
      );
    });
  }

  return comment;
};
