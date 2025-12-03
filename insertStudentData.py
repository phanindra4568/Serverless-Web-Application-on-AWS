import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Students')

def lambda_handler(event, context):
    body = json.loads(event['body'])  # Get POST JSON body
    student_id = str(uuid.uuid4())    # Auto-generate student ID

    # Prepare item
    item = {
        'studentid': student_id,
        'name': body['name'],
        'email': body['email'],
        'course': body['course']
    }

    # Insert into DynamoDB
    table.put_item(Item=item)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Student added successfully', 'studentid': student_id})
    }
