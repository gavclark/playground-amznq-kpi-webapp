const awsmobile = {
    "aws_project_region": "eu-west-1",
    "aws_cognito_region": "eu-west-1",
    "aws_user_pools_id": "COGNITO-POOL-ID",
    "aws_user_pools_web_client_id": "COGNITO-CLIENT-ID",
    "aws_user_files_s3_bucket": "XXXXXXXXX",
    "aws_user_files_s3_bucket_region": "eu-west-1",
    "aws_dynamodb_all_tables_region": "eu-west-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "KPIs",
            "region": "eu-west-1"
        },
        {
            "tableName": "KPIValues",
            "region": "eu-west-1"
        },
        {
            "tableName": "KPIGroups",
            "region": "eu-west-1"
        }
    ]
};

export default awsmobile;