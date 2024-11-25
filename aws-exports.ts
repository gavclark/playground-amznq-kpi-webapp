const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "COGNITO-POOL-ID",
    "aws_user_pools_web_client_id": "COGNITO-CLIENT-ID",
    "aws_user_files_s3_bucket": "XXXXXXXXX",
    "aws_user_files_s3_bucket_region": "us-east-1",
    "aws_dynamodb_all_tables_region": "us-east-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "KPIs",
            "region": "us-east-1"
        },
        {
            "tableName": "KPIValues",
            "region": "us-east-1"
        },
        {
            "tableName": "KPIGroups",
            "region": "us-east-1"
        }
    ]
};

export default awsmobile;