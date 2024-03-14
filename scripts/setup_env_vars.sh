#!/bin/bash
source /home/ubuntu/.bashrc

echo 'Fetch SSM Parameters: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
SSMParams=$(aws ssm describe-parameters | jq '.Parameters')

echo 'Fetch and Store Values of each SSM Parameter: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
for param in $SSMParams do
    ENV_VAR_NAME=$($param | jq '.Name')
    echo "Getting parameter $ENV_VAR_NAME from SSM parameter store if it exists and setting into the variable $ENV_VAR_NAME"
    SSM_VALUE=$(aws ssm get-parameters --with-decryption --names "${$ENV_VAR_NAME}" --query 'Parameters[*].Value' --output text)
    COMMAND="export $ENV_VAR_NAME=$SSM_VALUE"
    eval ${COMMAND}
done

echo 'Store Newly created environment variables to an .env file for production build: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log 
env | grep -e REACT_APP_ >> /home/ubuntu/thenaturebeautyflowers/.env.production >> /home/ubuntu/thenaturebeautyflowers/deploy.log