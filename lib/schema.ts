import { z } from "zod";

const nodeStylesSchema = z.object({
  display: z.enum(["block", "flex"]).optional(),
  flexDirection: z.enum(["row", "column"]).optional(),
  justifyContent: z.enum(["flex-start", "center", "space-between"]).optional(),
  alignItems: z.enum(["flex-start", "center"]).optional(),
  gap: z.string().optional(),
  paddingTop: z.string().optional(),
  paddingBottom: z.string().optional(),
  paddingLeft: z.string().optional(),
  paddingRight: z.string().optional(),
  maxWidth: z.string().optional(),
  backgroundColor: z.string().optional(),
  color: z.string().optional(),
  fontSize: z.string().optional(),
  borderRadius: z.string().optional()
});

export const layoutNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.enum(["section", "div", "heading", "text", "button"]),
    className: z.string().optional(),
    tag: z.enum(["h1", "h2", "p"]).optional(),
    text: z.string().optional(),
    styles: nodeStylesSchema.optional(),
    children: z.array(layoutNodeSchema).optional()
  })
);
