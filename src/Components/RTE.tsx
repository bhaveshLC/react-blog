import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { config } from "../config/config";

const RTE = ({ name, control, label, defaultValue = "" }: any) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Editor
            apiKey={config.TinyMCE_API_KEY}
            value={field.value}
            onEditorChange={(content) => {
              field.onChange(content);
            }}
            onBlur={field.onBlur}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
            }}
          />
        )}
      />
    </div>
  );
};

export default RTE;
