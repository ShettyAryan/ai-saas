import React from "react";

const SourceInfo = ({
  file_name,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  file_name: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) => {
  return <div>{file_name}</div>;
};

export default SourceInfo;
