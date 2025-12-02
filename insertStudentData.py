import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('studentData')

def lambda_handler(event, context):
    print("EVENT RECEIVED:", event)  # Print for debugging

    # Default empty values
    student_id = name = student_class = age = None

    # -------------------------
    # Case 1: API Gateway POST request -> data comes inside "body"
    # -------------------------
    if "body" in event:
        try:
            body = json.loads(event["body"])
            student_id = body.get("studentid")
            name = body.get("name")
            student_class = body.get("class")
            age = body.get("age")
        except:
            pass

    # -------------------------
    # Case 2: Direct Lambda test input -> data at root level
    # -------------------------
    if not student_id:
        student_id = event.get("studentid")
    if not name:
        name = event.get("name")
    if not student_class:
        student_class = event.get("class")
    if not age:
        age = event.get("age")

    # -------------------------
    # Validate required fields
    # -------------------------
    if not (student_id and name and student_class and age):
        return {
            "statusCode": 400,
            "body": json.dumps({
                "error": "Missing required student data",
                "received_event": event
            })
        }

    # -------------------------
    # Write to DynamoDB
    # -------------------------
    table.put_item(
        Item={
            'studentid': student_id,
            'name': name,
            'class': student_class,
            'age': age
        }
    )

    return {
        "statusCode": 200,
        "body": json.dumps("Student data saved successfully!")
    }
