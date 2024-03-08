import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { FilterClause } from "./types/types";
import { filterSubmissions } from "./helpers/helpers";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
const apiKey = process.env.FILLOUT_API_KEY;

if (!process.env.PORT || !process.env.FILLOUT_API_KEY) {
  console.error("Missing required environment variables");
  process.exit(1);
}

app.get("/:formId", async (req: Request, res: Response) => {
  const { formId } = req.params;
  const filters: FilterClause[] = req.body;
  const limit = parseInt(req.query.limit as string);
  const offset = parseInt(req.query.offset as string) || 1;

  const baseURL = `https://api.fillout.com/v1/api/forms/${formId}/submissions`;
  const queryParams = new URLSearchParams(req.query as Record<string, string>);
  queryParams.delete("limit");
  queryParams.delete("page");

  const fetchUrl = `${baseURL}?${queryParams.toString}`;

  try {
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).send({ error: response.statusText });
    }

    const { responses } = await response.json();

    let filteredSubmissions = filters.length >= 1
      ? filterSubmissions(responses, filters)
      : responses;

    const totalResponses = filteredSubmissions.length;
    let pageCount = 1;

    // Apply pagination if limit is provided
    if (limit && totalResponses > 0) {
      pageCount = Math.ceil(totalResponses / limit);
      const startIndex = (offset - 1) * limit;
      const endIndex = startIndex + limit;
      filteredSubmissions = filteredSubmissions.slice(startIndex, endIndex);
    }

    return res.send({
      responses: filteredSubmissions,
      totalResponses,
      pageCount,
    });
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
});

app.listen(port);
