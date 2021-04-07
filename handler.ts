"use strict";

import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from "aws-lambda";

export const api: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
	return {
		statusCode: 200,
		body: JSON.stringify({ message: "Successful." })
	};
};