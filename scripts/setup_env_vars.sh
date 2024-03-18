#!/bin/bash
echo 'Fetch SSM Parameters...'
SSMParams=$(aws ssm describe-parameters --query 'Parameters[*].Name' | jq '.[]')

echo 'Fetch and Store Values of each SSM Parameter...'
for param in $SSMParams; do
    echo "Getting parameter $param from SSM parameter store if it exists and setting into the variable $param" 
    SSM_CMD="aws ssm get-parameter --with-decryption --name $param --query 'Parameter.Value' --output text"
    SSM_VALUE=$(eval ${SSM_CMD})
    COMMAND="export $param=\"$SSM_VALUE\""
    eval ${COMMAND}
done

echo 'Store Newly created environment variables to an .env file for production build...' 
env | grep -e REACT_APP_ >> .env.production