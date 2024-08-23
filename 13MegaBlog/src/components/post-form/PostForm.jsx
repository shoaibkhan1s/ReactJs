import React, { useCallback } from "react";
import { useForm } from "react-hook-form"; // Form handling ke liye useForm hook import kiya
import { useNavigate } from "react-router-dom"; // Navigation ke liye hook import kiya
import { useSelector } from "react-redux"; // Redux store se state ko access karne ke liye import kiya
import appwriteService from "../../appwrite/config"; // Appwrite service import kiya jo database aur file operations handle karta hai
import { Button, Input, RTE, Select } from ".."; // Custom components import kiye jo form fields aur buttons provide karte hain

export default function PostForm({ post }) { // PostForm component jo post prop accept karta hai
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "", // Default value set kiya agar post object available hai
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate(); // Navigation ke liye useNavigate hook
  const userData = useSelector((state) => state.auth.userData); // Redux store se current user data fetch kiya

  const submit = async (data) => { // Form submit function jo async hai aur form data ko handle karta hai
    if (post) { // Agar post object present hai toh update operation perform kiya jata hai
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0]) // File upload kiya agar image present hai
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage); // Agar nayi image hai toh purani image ko delete kiya
      }

      const dbPost = await appwriteService.updatePost(post.$id, { // Post ko update kiya database me
        ...data,
        featuredImage: file ? file.$id : undefined, // Nayi image ka ID set kiya
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`); // Update hone ke baad user ko updated post pe redirect kiya
      }
    } else { // Agar post object nahi hai toh create operation perform kiya jata hai
      const file =  data.image[0]
        ? await appwriteService.uploadFile(data.image[0]) // File upload kiya agar image present hai
        : null;

      if (file) {
        const fileId = file.$id; // File ID fetch kiya
        data.featuredImage = fileId; // Post data me featuredImage ka ID set kiya
        const dbPost = await appwriteService.createPost({ // Naya post create kiya database me
          ...data,
          userId: userData.$id, // Current user ID ko add kiya
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`); // Creation ke baad user ko newly created post pe redirect kiya
        }
      }
    }
  };

  const slugTransform = useCallback((value) => { // Slug generate karne ke liye function
    if (value && typeof value === "string")
      return (
        value
          .trim()
          .toLowerCase()
          .replace(/\s/g, "-") // Spaces ko dashes me replace kiya
      );

    return "";
  }, []);

  React.useEffect(() => { // Effect hook jo slug update karta hai title change hone par
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe(); // Unsubscribe kiya effect clean-up ke liye
    };
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap"> {/* Form submit hone par handleSubmit function call hota hai */}
      <div className="w-2/3 px-2"> {/* Left side ka section */}
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })} // Title field ko register kiya aur required validation set kiya
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })} // Slug field ko register kiya aur required validation set kiya
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            }); // Input change hone par slug transform kiya
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")} // Rich Text Editor ko control aur default value provide ki
        />
      </div>
      <div className="w-1/3 px-2"> {/* Right side ka section */}
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })} // Image field ko register kiya aur required validation set kiya agar post nahi hai
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            /> {/* Post ke existing image ko dikhaya agar post object available hai */}
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })} // Status field ko register kiya aur required validation set kiya
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined} // Button color update kiya agar post object available hai
          className="w-full"
        >
          {post ? "Update" : "Submit"} {/* Button text ko update ya submit ke roop me set kiya */}
        </Button>
      </div>
    </form>
  );
}
