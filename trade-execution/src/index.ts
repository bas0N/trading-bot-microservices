import { Kafka } from "kafkajs";
require("dotenv").config();

import { auth } from "./services/auth";
import { handleExecutionCalls } from "./services/handleExecutionCalls";

handleExecutionCalls();
