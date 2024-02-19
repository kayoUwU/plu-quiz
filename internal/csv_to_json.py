import argparse
import csv

## for ease, assume all string type json
def process():
    with open(args.jsPath, "w") as jsFile:
        jsFile.write(f'export const {args.objectName} = [\n')

        with open(args.csvPath, newline='') as csvFile:
            reader  = csv.reader(csvFile, delimiter=",")
            headers = next(reader)
            print(headers)

            for i, row in enumerate(reader):
                if len(headers) != len(row):
                    raise Exception(f'line {i}: argument size not align with headers')
                
                jsFile.write('{\n')
                jsFile.write(f'\tid:{i},\n')
                for j, name in enumerate(headers):
                    jsFile.write(f'\t{name}:\'{row[j]}\',\n')
                jsFile.write('},\n')

        jsFile.write('];')

def main():
    parser = argparse.ArgumentParser(description='.CSV to Json.js')
    parser.add_argument('-i','--input', action='store', dest='csvPath', default='plu_data.csv', type=str, help='Input: csv file path')
    parser.add_argument('-o','--output', action='store', dest='jsPath', default='plu_data.js', type=str, help='Output: Json.js path')
    parser.add_argument('-v','--variable', action='store', dest='objectName', default='PLU_DATA', type=str, help='Variable: Json object name')
    global args 
    args = parser.parse_args()
    print(args)
    process()

if __name__=="__main__": 
    main() 