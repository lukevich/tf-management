env_id = "dev"
region = "us-east-1"
vpc_cidr = "10.0.0.0/16"
private_subnet_cidr_blocks = [
  "10.0.0.0/18",
  "10.0.64.0/18"
]
public_subnet_cidr_blocks = [
  "10.0.192.0/24",
  "10.0.193.0/24"
]
single_nat_gateway = true