import React from "react";
import { Editor } from "@tinymce/tinymce-react"; // TinyMCE editor import kiya, jo ek rich text editor hai
import { Controller } from "react-hook-form"; // React Hook Form se Controller import kiya, jo form fields ko control karta hai

export default function RTE({ name, control, label, defaultValue = "" }) { // RTE component jo props ko accept karta hai
  return (
    <div className="w-full"> {/* Container jo editor ko full width deta hai */}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>} {/* Agar label pass kiya gaya hai toh dikhata hai */}
      
      <Controller
        name={name || "content"} // Field ka naam, default se "content" set kiya gaya hai
        control={control} // React Hook Form se control prop jo form handling ke liye zaroori hai
        render={({ field: { onChange } }) => ( // Render function jo onChange handler ko pass karta hai
          <Editor
            apiKey= 'd02p5bbfz9pspyhusff2gy9xjs8fhvflpwfc6huldz25bhll'
            initialValue={defaultValue} // Editor ka initial value set kiya
            init={{
              height: 500, // Editor ki height set ki
              menubar: true, // Menubar ko enable kiya
              plugins: [ // Plugins jo editor ke features ko enhance karte hain
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help", // Toolbar me formatting options add kiye
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }", // Content styling set ki
            }}
            onEditorChange={onChange} // Jab bhi editor ka content change ho, yeh function call hota hai
          />
        )}
      />
    </div>
  );
}
