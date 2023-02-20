import { Kafka } from "kafkajs";
require("dotenv").config();

import { auth } from "./services/auth";

auth();
