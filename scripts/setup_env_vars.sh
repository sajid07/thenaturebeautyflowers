#!/bin/bash
source /home/ubuntu/.bashrc

echo 'Fetch SSM Parameters: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
SSMParams=$(aws ssm describe-parameters)

echo 'Fetch and Store Values of each SSM Parameter: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
for param in ${SSMParams.Parameters} do
    echo "Getting parameter ${param.Name} from SSM parameter store if it exists and setting into the variable ${param.Name}"
    SSM_VALUE=`aws ssm get-parameters --with-decryption --names "${param.Name}"  --query 'Parameters[*].Value' --output text`
    COMMAND="export $ENV_VAR_NAME=$SSM_VALUE"
    eval ${COMMAND}
done

echo 'Store Newly created environment variables to an .env file for production build: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log 
env | grep -e REACT_APP_ >> .env.production >> /home/ubuntu/thenaturebeautyflowers/deploy.log