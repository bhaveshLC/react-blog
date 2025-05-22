import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { config } from "../config/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const RTE = ({ name, control, label, defaultValue = "" }: any) => {
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    setEditorKey((prevKey) => prevKey + 1);
  }, [isDarkMode]);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Editor
            key={editorKey}
            apiKey={config.TinyMCE_API_KEY}
            value={field.value}
            onEditorChange={(content) => {
              field.onChange(content);
            }}
            onBlur={field.onBlur}
            init={{
              skin: isDarkMode ? "oxide-dark" : "oxide",
              content_css: isDarkMode ? "dark" : "default",
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "lists",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style: `
                  body {
                    background-color: ${isDarkMode ? "slate" : "white"};
                    color: ${isDarkMode ? "white" : "black"};
                  }
                `,
            }}
          />
        )}
      />
    </div>
  );
};

export default RTE;
