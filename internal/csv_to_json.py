import argparse
import csv

## for ease, assume all string type json
def process():
    with open(args.jsPath, "w") as jsFile:
        if not args.isJSON:
            jsFile.write(f'export const {args.objectName} = ')
        jsFile.write(f'[\n')

        with open(args.csvPath, newline='') as csvFile:
            reader  = csv.reader(csvFile, delimiter=",")
            headers = next(reader)
            print(headers)

            for i, row in enumerate(reader):
                if len(headers) != len(row):
                    raise Exception(f'line {i}: argument size not align with headers')
                
                if i!=0:
                    jsFile.write(',\n')

                jsFile.write('{\n')
                if args.isJSON is True:
                    jsFile.write(f'\t"id":{i},\n')
                else:
                    jsFile.write(f'\tid:{i},\n')
                for j, name in enumerate(headers):
                    _name = name if not args.isJSON else f'"{name}"'
                    if args.isJSON is True and j==len(row)-1:
                        jsFile.write(f'\t{_name}:"{row[j]}"\n')
                    else:
                        jsFile.write(f'\t{_name}:"{row[j]}",\n')
                jsFile.write('}')
       
        if args.isJSON is True:
             jsFile.write('\n]')
        else:
            jsFile.write(',\n];')

def main():
    parser = argparse.ArgumentParser(description='.CSV to Json.js')
    parser.add_argument('-i','--input', action='store', dest='csvPath', default='plu_data.csv', type=str, help='Input: csv file path')
    parser.add_argument('-o','--output', action='store', dest='jsPath', default='plu_data.js', type=str, help='Output: Json.js path')
    parser.add_argument('-v','--variable', action='store', dest='objectName', default='PLU_DATA', type=str, help='Variable: Json object name')
    parser.add_argument('-j','--json', action=argparse.BooleanOptionalAction, dest='isJSON', default=False, type=bool, help='Json: is use json syntax, otherwise javascript')
    global args 
    args = parser.parse_args()
    print(args)
    process()

if __name__=="__main__": 
    main() 