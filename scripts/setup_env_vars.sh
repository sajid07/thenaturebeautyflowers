#!/bin/bash
source /home/ubuntu/.bashrc

echo 'Fetch SSM Parameters: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
SSMParams=$(aws ssm describe-parameters --query 'Parameters[*].Name')

echo 'Fetch and Store Values of each SSM Parameter: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
for param in $($SSMParams | jq '.[]'); do
    echo "Getting parameter $param from SSM parameter store if it exists and setting into the variable $param" >> /home/ubuntu/thenaturebeautyflowers/deploy.log
    SSM_VALUE=$(aws ssm get-parameters --with-decryption --names "$param" --query 'Parameters[*].Value' --output text)
    COMMAND="export $param=$SSM_VALUE"
    eval ${COMMAND}
done

echo 'Store Newly created environment variables to an .env file for production build: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log 
env | grep -e REACT_APP_ >> /home/ubuntu/thenaturebeautyflowers/.env.production