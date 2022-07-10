/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Blog, BlogInterface } from "../Blog";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isBanned",
        type: "bool",
      },
    ],
    name: "PostBanned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "PostCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "PostUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isBanned",
        type: "bool",
      },
    ],
    name: "banPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_contentHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imageHash",
        type: "string",
      },
      {
        internalType: "bool",
        name: "_isPublished",
        type: "bool",
      },
    ],
    name: "createPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "fetchPost",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "contentHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageHash",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isPublished",
            type: "bool",
          },
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
        ],
        internalType: "struct Blog.Post",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchPosts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "contentHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageHash",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isPublished",
            type: "bool",
          },
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
        ],
        internalType: "struct Blog.Post[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "updateBlogName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_contentHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imageHash",
        type: "string",
      },
      {
        internalType: "bool",
        name: "_isPublished",
        type: "bool",
      },
    ],
    name: "updatePost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620024be380380620024be833981810160405281019062000037919062000380565b620000576200004b620000c360201b60201c565b620000cb60201b60201c565b620000a36040518060400160405280601981526020017f4465706c6f79696e6720426c6f672077697468206e616d653a00000000000000815250826200018f60201b62000ef11760201c565b8060019080519060200190620000bb9291906200025e565b5050620005cd565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b620002318282604051602401620001a892919062000406565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506200023560201b60201c565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b8280546200026c90620004f2565b90600052602060002090601f016020900481019282620002905760008555620002dc565b82601f10620002ab57805160ff1916838001178555620002dc565b82800160010185558215620002dc579182015b82811115620002db578251825591602001919060010190620002be565b5b509050620002eb9190620002ef565b5090565b5b808211156200030a576000816000905550600101620002f0565b5090565b6000620003256200031f846200046a565b62000441565b9050828152602081018484840111156200033e57600080fd5b6200034b848285620004bc565b509392505050565b600082601f8301126200036557600080fd5b8151620003778482602086016200030e565b91505092915050565b6000602082840312156200039357600080fd5b600082015167ffffffffffffffff811115620003ae57600080fd5b620003bc8482850162000353565b91505092915050565b6000620003d282620004a0565b620003de8185620004ab565b9350620003f0818560208601620004bc565b620003fb81620005bc565b840191505092915050565b60006040820190508181036000830152620004228185620003c5565b90508181036020830152620004388184620003c5565b90509392505050565b60006200044d62000460565b90506200045b828262000528565b919050565b6000604051905090565b600067ffffffffffffffff8211156200048857620004876200058d565b5b6200049382620005bc565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015620004dc578082015181840152602081019050620004bf565b83811115620004ec576000848401525b50505050565b600060028204905060018216806200050b57607f821691505b602082108114156200052257620005216200055e565b5b50919050565b6200053382620005bc565b810181811067ffffffffffffffff821117156200055557620005546200058d565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b611ee180620005dd6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638b075828116100665780638b075828146101335780638da5cb5b1461014f578063abaddd7f1461016d578063e71ef23d1461018b578063f2fde38b146101a75761009e565b806306fdde03146100a35780631e581d96146100c15780636e450105146100dd578063715018a6146100f957806375e1e07e14610103575b600080fd5b6100ab6101c3565b6040516100b89190611865565b60405180910390f35b6100db60048036038101906100d691906113d8565b610251565b005b6100f760048036038101906100f29190611414565b6103bc565b005b61010161050f565b005b61011d600480360381019061011891906113af565b610597565b60405161012a919061197e565b60405180910390f35b61014d600480360381019061014891906112c3565b610856565b005b6101576108ec565b6040516101649190611828565b60405180910390f35b610175610915565b6040516101829190611843565b60405180910390f35b6101a560048036038101906101a09190611304565b610cd8565b005b6101c160048036038101906101bc919061129a565b610df9565b005b600180546101d090611bb4565b80601f01602080910402602001604051908101604052809291908181526020018280546101fc90611bb4565b80156102495780601f1061021e57610100808354040283529160200191610249565b820191906000526020600020905b81548152906001019060200180831161022c57829003601f168201915b505050505081565b610259610f8d565b73ffffffffffffffffffffffffffffffffffffffff166102776108ec565b73ffffffffffffffffffffffffffffffffffffffff16146102cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c49061195e565b60405180910390fd5b8015156005600084815260200190815260200160002060009054906101000a900460ff1615151415610334576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032b906118be565b60405180910390fd5b8015610349576103446003610f95565b610354565b6103536003610fab565b5b806005600084815260200190815260200160002060006101000a81548160ff0219169083151502179055507fa0605be0985928353f90ba0993f48dda29359cef1b83398614bd68504653c57782826040516103b09291906119bb565b60405180910390a15050565b60006004600087815260200190815260200160002090503373ffffffffffffffffffffffffffffffffffffffff168160040160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610465576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045c9061193e565b60405180910390fd5b8481600101908051906020019061047d929190611102565b5083816002019080519060200190610496929190611102565b50828160030190805190602001906104af929190611102565b50818160040160006101000a81548160ff0219169083151502179055507f2d092d8220c21e9f2d397a27cfc890719068e1dfc64d5bfde92b3d061c69d82981600001546040516104ff91906119a0565b60405180910390a1505050505050565b610517610f8d565b73ffffffffffffffffffffffffffffffffffffffff166105356108ec565b73ffffffffffffffffffffffffffffffffffffffff161461058b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105829061195e565b60405180910390fd5b6105956000611007565b565b61059f611188565b6005600083815260200190815260200160002060009054906101000a900460ff1615610600576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f79061191e565b60405180910390fd5b600460008381526020019081526020016000206040518060c00160405290816000820154815260200160018201805461063890611bb4565b80601f016020809104026020016040519081016040528092919081815260200182805461066490611bb4565b80156106b15780601f10610686576101008083540402835291602001916106b1565b820191906000526020600020905b81548152906001019060200180831161069457829003601f168201915b505050505081526020016002820180546106ca90611bb4565b80601f01602080910402602001604051908101604052809291908181526020018280546106f690611bb4565b80156107435780601f1061071857610100808354040283529160200191610743565b820191906000526020600020905b81548152906001019060200180831161072657829003601f168201915b5050505050815260200160038201805461075c90611bb4565b80601f016020809104026020016040519081016040528092919081815260200182805461078890611bb4565b80156107d55780601f106107aa576101008083540402835291602001916107d5565b820191906000526020600020905b8154815290600101906020018083116107b857829003601f168201915b505050505081526020016004820160009054906101000a900460ff161515151581526020016004820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050919050565b61085e610f8d565b73ffffffffffffffffffffffffffffffffffffffff1661087c6108ec565b73ffffffffffffffffffffffffffffffffffffffff16146108d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c99061195e565b60405180910390fd5b80600190805190602001906108e8929190611102565b5050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600061092360026110cb565b9050600061093160036110cb565b9050600081836109419190611af6565b67ffffffffffffffff811115610980577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156109b957816020015b6109a6611188565b81526020019060019003908161099e5790505b5090506000805b84821015610ccd57600560006001846109d99190611aa0565b815260200190815260200160002060009054906101000a900460ff1615610a0d578180610a0590611c17565b9250506109c0565b60046000600184610a1e9190611aa0565b81526020019081526020016000206040518060c001604052908160008201548152602001600182018054610a5190611bb4565b80601f0160208091040260200160405190810160405280929190818152602001828054610a7d90611bb4565b8015610aca5780601f10610a9f57610100808354040283529160200191610aca565b820191906000526020600020905b815481529060010190602001808311610aad57829003601f168201915b50505050508152602001600282018054610ae390611bb4565b80601f0160208091040260200160405190810160405280929190818152602001828054610b0f90611bb4565b8015610b5c5780601f10610b3157610100808354040283529160200191610b5c565b820191906000526020600020905b815481529060010190602001808311610b3f57829003601f168201915b50505050508152602001600382018054610b7590611bb4565b80601f0160208091040260200160405190810160405280929190818152602001828054610ba190611bb4565b8015610bee5780601f10610bc357610100808354040283529160200191610bee565b820191906000526020600020905b815481529060010190602001808311610bd157829003601f168201915b505050505081526020016004820160009054906101000a900460ff161515151581526020016004820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050838281518110610ca1577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101819052508180610cb790611c17565b9250508080610cc590611c17565b9150506109c0565b829550505050505090565b610ce26002610f95565b6000610cee60026110cb565b9050600060046000838152602001908152602001600020905081816000018190555085816001019080519060200190610d28929190611102565b5084816002019080519060200190610d41929190611102565b5083816003019080519060200190610d5a929190611102565b50828160040160006101000a81548160ff021916908315150217905550338160040160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f7083e11102808886115763619dc7e7c3f40b0b6dfd04262b94ea7de82d917ece82604051610de991906119a0565b60405180910390a1505050505050565b610e01610f8d565b73ffffffffffffffffffffffffffffffffffffffff16610e1f6108ec565b73ffffffffffffffffffffffffffffffffffffffff1614610e75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e6c9061195e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610ee5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610edc906118fe565b60405180910390fd5b610eee81611007565b50565b610f898282604051602401610f07929190611887565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506110d9565b5050565b600033905090565b6001816000016000828254019250508190555050565b60008160000154905060008111610ff7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fee906118de565b60405180910390fd5b6001810382600001819055505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081600001549050919050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b82805461110e90611bb4565b90600052602060002090601f0160209004810192826111305760008555611177565b82601f1061114957805160ff1916838001178555611177565b82800160010185558215611177579182015b8281111561117657825182559160200191906001019061115b565b5b50905061118491906111d6565b5090565b6040518060c0016040528060008152602001606081526020016060815260200160608152602001600015158152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b5b808211156111ef5760008160009055506001016111d7565b5090565b600061120661120184611a09565b6119e4565b90508281526020810184848401111561121e57600080fd5b611229848285611b72565b509392505050565b60008135905061124081611e66565b92915050565b60008135905061125581611e7d565b92915050565b600082601f83011261126c57600080fd5b813561127c8482602086016111f3565b91505092915050565b60008135905061129481611e94565b92915050565b6000602082840312156112ac57600080fd5b60006112ba84828501611231565b91505092915050565b6000602082840312156112d557600080fd5b600082013567ffffffffffffffff8111156112ef57600080fd5b6112fb8482850161125b565b91505092915050565b6000806000806080858703121561131a57600080fd5b600085013567ffffffffffffffff81111561133457600080fd5b6113408782880161125b565b945050602085013567ffffffffffffffff81111561135d57600080fd5b6113698782880161125b565b935050604085013567ffffffffffffffff81111561138657600080fd5b6113928782880161125b565b92505060606113a387828801611246565b91505092959194509250565b6000602082840312156113c157600080fd5b60006113cf84828501611285565b91505092915050565b600080604083850312156113eb57600080fd5b60006113f985828601611285565b925050602061140a85828601611246565b9150509250929050565b600080600080600060a0868803121561142c57600080fd5b600061143a88828901611285565b955050602086013567ffffffffffffffff81111561145757600080fd5b6114638882890161125b565b945050604086013567ffffffffffffffff81111561148057600080fd5b61148c8882890161125b565b935050606086013567ffffffffffffffff8111156114a957600080fd5b6114b58882890161125b565b92505060806114c688828901611246565b9150509295509295909350565b60006114df83836116dc565b905092915050565b6114f081611b2a565b82525050565b6114ff81611b2a565b82525050565b600061151082611a4a565b61151a8185611a6d565b93508360208202850161152c85611a3a565b8060005b85811015611568578484038952815161154985826114d3565b945061155483611a60565b925060208a01995050600181019050611530565b50829750879550505050505092915050565b61158381611b3c565b82525050565b61159281611b3c565b82525050565b60006115a382611a55565b6115ad8185611a7e565b93506115bd818560208601611b81565b6115c681611ced565b840191505092915050565b60006115dc82611a55565b6115e68185611a8f565b93506115f6818560208601611b81565b6115ff81611ced565b840191505092915050565b6000611617602183611a8f565b915061162282611cfe565b604082019050919050565b600061163a601b83611a8f565b915061164582611d4d565b602082019050919050565b600061165d602683611a8f565b915061166882611d76565b604082019050919050565b6000611680600e83611a8f565b915061168b82611dc5565b602082019050919050565b60006116a3602383611a8f565b91506116ae82611dee565b604082019050919050565b60006116c6602083611a8f565b91506116d182611e3d565b602082019050919050565b600060c0830160008301516116f4600086018261180a565b506020830151848203602086015261170c8282611598565b915050604083015184820360408601526117268282611598565b915050606083015184820360608601526117408282611598565b9150506080830151611755608086018261157a565b5060a083015161176860a08601826114e7565b508091505092915050565b600060c08301600083015161178b600086018261180a565b50602083015184820360208601526117a38282611598565b915050604083015184820360408601526117bd8282611598565b915050606083015184820360608601526117d78282611598565b91505060808301516117ec608086018261157a565b5060a08301516117ff60a08601826114e7565b508091505092915050565b61181381611b68565b82525050565b61182281611b68565b82525050565b600060208201905061183d60008301846114f6565b92915050565b6000602082019050818103600083015261185d8184611505565b905092915050565b6000602082019050818103600083015261187f81846115d1565b905092915050565b600060408201905081810360008301526118a181856115d1565b905081810360208301526118b581846115d1565b90509392505050565b600060208201905081810360008301526118d78161160a565b9050919050565b600060208201905081810360008301526118f78161162d565b9050919050565b6000602082019050818103600083015261191781611650565b9050919050565b6000602082019050818103600083015261193781611673565b9050919050565b6000602082019050818103600083015261195781611696565b9050919050565b60006020820190508181036000830152611977816116b9565b9050919050565b600060208201905081810360008301526119988184611773565b905092915050565b60006020820190506119b56000830184611819565b92915050565b60006040820190506119d06000830185611819565b6119dd6020830184611589565b9392505050565b60006119ee6119ff565b90506119fa8282611be6565b919050565b6000604051905090565b600067ffffffffffffffff821115611a2457611a23611cbe565b5b611a2d82611ced565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611aab82611b68565b9150611ab683611b68565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611aeb57611aea611c60565b5b828201905092915050565b6000611b0182611b68565b9150611b0c83611b68565b925082821015611b1f57611b1e611c60565b5b828203905092915050565b6000611b3582611b48565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015611b9f578082015181840152602081019050611b84565b83811115611bae576000848401525b50505050565b60006002820490506001821680611bcc57607f821691505b60208210811415611be057611bdf611c8f565b5b50919050565b611bef82611ced565b810181811067ffffffffffffffff82111715611c0e57611c0d611cbe565b5b80604052505050565b6000611c2282611b68565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611c5557611c54611c60565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f506f737420697320616c72656164792062616e6e65642f6e6f742062616e6e6560008201527f6400000000000000000000000000000000000000000000000000000000000000602082015250565b7f436f756e7465723a2064656372656d656e74206f766572666c6f770000000000600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f506f73742069732062616e6e6564000000000000000000000000000000000000600082015250565b7f4f6e6c792074686520617574686f722063616e2075706461746520746865207060008201527f6f73740000000000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b611e6f81611b2a565b8114611e7a57600080fd5b50565b611e8681611b3c565b8114611e9157600080fd5b50565b611e9d81611b68565b8114611ea857600080fd5b5056fea2646970667358221220bf526b44cc58d503cf6cfbf62a36d9fc69ce3de07d81b42f86ec7a551b24fbec64736f6c63430008040033";

export class Blog__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Blog> {
    return super.deploy(_name, overrides || {}) as Promise<Blog>;
  }
  getDeployTransaction(
    _name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, overrides || {});
  }
  attach(address: string): Blog {
    return super.attach(address) as Blog;
  }
  connect(signer: Signer): Blog__factory {
    return super.connect(signer) as Blog__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BlogInterface {
    return new utils.Interface(_abi) as BlogInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Blog {
    return new Contract(address, _abi, signerOrProvider) as Blog;
  }
}
