### Sources overview

- **parser** - Package includes the following parsing modules:
    * _tfstate_  
    * _tfvars_  
    * _metadata_  
   Each module contains ```parse(string)``` method that is used to
   parse string with file content


- **tf_stack** - Package contains modules:  
    * _backend_ - backend configuration
    * _constructor_ - terraform stack class, construct method
                        and other related functions     
    * _scanner_ - lists all stacks from configured _tf_backend_  


- **tf_backend** - Package contains terraform backend client modules (_s3_ now only). 
    Each new backend client must implement two methods:   
    * ```list_keys()``` - must return list of keys 
                        (non-empty .tfstate files)  
    * ```request_file(key)``` - must return ascii decoded string 
                               with file content
   
   
- **cloud_console_url** - Contains _generator_ module that generate cloud 
    provider resource URLs. Cloud provider ui path templates are placed under _resources_ folder as a _.yaml_ file (e.g. aws_console_ui_paths.yaml)


- **loggers.py** - Contains logging configuration function.


- **lambda_handler.py** - Contains lambda handler main function.




### Run tests
In order to run tests:
1. Install requirements if you haven't
    ```
    pip install -r backend/sources/requirements.txt
    ```
2. Install tests requirements:
    ```
    pip install -r backend/tests/test-requirements.txt
    ```
3. Run tests:
   ```
   py.test backend/tests 
   ```
