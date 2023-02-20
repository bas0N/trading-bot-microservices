# trading-bot-microservices
# Microservices Trading Bot with XTB API using Kubernetes
This is a microservices trading bot that uses the XTB API to retrieve market data and make trades. The bot is designed to run on a Kubernetes cluster, and it consists of three pods: 
- the data collector, 
- the decision making pod, 
- the trade execution handler. 
<br />
All pods communicate with each other using Kafka.
<div align="center">
<img src=https://user-images.githubusercontent.com/86808206/220212075-a10fa8a6-fc07-4726-b82b-fd58e3aeb63f.png>
</div>
<br />

## Kubernetes Architecture
The Kubernetes architecture of this trading bot consists of three main pods:

## Data Collector
The data collector pod is responsible for retrieving market data from the XTB API. It runs continuously, collecting data from the API and storing it in a database. The data collected includes market prices, order books, and other relevant information.

## Bot-1
The Bot-1 pod is responsible for making trading decisions based on the data collected by the data collector pod. The pod uses a strategy based on the RSI (relative strength index) to analyze the market data and make informed trading decisions. Once the decision is made, the Bot-1 pod communicates with the trade execution handler pod to execute the trade.

## Trade Execution Handler
The trade execution handler pod is responsible for executing trades on the XTB API. When a trading decision is made by the Bot-1 pod, the trade execution handler pod requests the trade to be executed on the XTB API. Once the trade is executed, the trade execution handler pod updates the status of the trade in the database.

## Strategy
The Bot-1 pod uses a trading strategy based on the RSI (relative strength index). The RSI is a technical indicator that measures the strength of a security's price action. The RSI oscillates between 0 and 100 and is considered overbought when above 70 and oversold when below 30.

The trading strategy used by the Bot-1 pod involves buying a security when the RSI is oversold (below 30) and selling when the RSI is overbought (above 70). The strategy also incorporates stop-loss orders to limit potential losses.

## Setup and Deployment
To deploy this trading bot on a Kubernetes cluster, follow the instructions below:

1. Clone the repository to your local machine.
2. Set up a Kafka cluster and update the configuration files in the kubernetes directory with the appropriate Kafka details.
3. Set up a database to store market data and update the configuration files in the kubernetes directory with the appropriate database details.
4. Build the Docker images for the data collector, Bot-1, and trade execution handler using the provided Dockerfiles.
5. Deploy the Kubernetes resources using the provided YAML files.
<br />

After the deployment, the trading bot will run on the Kubernetes cluster and retrieve market data, analyze it, and make trading decisions based on the RSI strategy.

