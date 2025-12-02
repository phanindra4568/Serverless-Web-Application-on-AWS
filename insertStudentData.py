import boto3
import json
import uuid

def lambda_handler(event, context):
    body = json.loads(event["body"])
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Students')

    item = {
        "studentId": str(uuid.uuid4()),
        "name": body["name"],
        "email": body["email"]
    }

    table.put_item(Item=item)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"message": "Student added successfully!"})
    }
