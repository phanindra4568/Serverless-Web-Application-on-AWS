import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Students')

def lambda_handler(event, context):
    
    # For debugging
    print("EVENT:", event)

    # Handle case when event has no body (example: direct Lambda test)
    if "body" not in event:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing 'body' in event"})
        }

    body = json.loads(event['body'])

    student_id = str(uuid.uuid4())

    item = {
        "studentid": student_id,
        "name": body["name"],
        "email": body["email"],
        "course": body["course"]
    }

    table.put_item(Item=item)

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Student inserted", "studentid": student_id})
    }

