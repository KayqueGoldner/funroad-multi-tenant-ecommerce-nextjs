"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarPicker } from "@/components/star-picker";
import { ReviewsGetOneOutput } from "@/modules/reviews/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface ReviewFormProps {
  productId: string;
  initialData?: ReviewsGetOneOutput;
}

const formSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required" }).max(5),
  description: z.string().min(1, { message: "Description is required" }),
});

export const ReviewForm = ({ productId, initialData }: ReviewFormProps) => {
  const [isPreview, setIsPreview] = useState(!!initialData);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createReview = useMutation(
    trpc.reviews.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({ productId }),
        );
        setIsPreview(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );
  const updateReview = useMutation(
    trpc.reviews.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({ productId }),
        );
        setIsPreview(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: initialData?.rating ?? 0,
      description: initialData?.description ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      updateReview.mutate({
        reviewId: initialData.id,
        rating: values.rating,
        description: values.description,
      });
    } else {
      createReview.mutate({
        productId,
        rating: values.rating,
        description: values.description,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <p className="font-medium">
          {isPreview ? "Your rating:" : "Liked it? Give it a rating"}
        </p>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarPicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Want to leave a written review?"
                  disabled={isPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isPreview && (
          <Button
            type="submit"
            size="lg"
            variant="elevated"
            disabled={createReview.isPending || updateReview.isPending}
            className="hover:text-primary w-fit bg-black text-white hover:bg-pink-400"
          >
            {initialData ? "Update review" : "Post review"}
          </Button>
        )}
      </form>
      {isPreview && (
        <Button
          type="button"
          variant="elevated"
          size="lg"
          onClick={() => setIsPreview(false)}
          className="mt-4 w-fit"
        >
          Edit
        </Button>
      )}
    </Form>
  );
};

export const ReviewFormSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <p className="font-medium">Liked it? Give it a rating</p>
      </div>
      <StarPicker disabled />
      <Textarea placeholder="Want to leave a written review?" disabled />
      <Button
        type="button"
        variant="elevated"
        size="lg"
        className="hover:text-primary w-fit bg-black text-white hover:bg-pink-400"
        disabled
      >
        Post review
      </Button>
    </div>
  );
};
