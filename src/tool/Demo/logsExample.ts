import {AwsPureLogInterface} from "@/type/AwsLogTypes";

const dataSet: AwsPureLogInterface[] = [
  {
    "timestamp": 129.050634,
    "processId": 382,
    "threadId": 382,
    "parentProcessId": 1,
    "userId": 101,
    "mountNamespace": 4026532232,
    "processName": "systemd-resolve",
    "hostName": "ip-10-100-1-217",
    "eventId": 41,
    "eventName": "socket",
    "stackAddresses": [
      140159195621643,
      140159192455417,
      94656731598592
    ],
    "argsNum": 3,
    "returnValue": 15,
    "args": "[{'name': 'domain', 'type': 'int', 'value': 'AF_UNIX'}, {'name': 'type', 'type': 'int', 'value': 'SOCK_DGRAM|SOCK_CLOEXEC'}, {'name': 'protocol', 'type': 'int', 'value': 0}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.051238,
    "processId": 379,
    "threadId": 379,
    "parentProcessId": 1,
    "userId": 100,
    "mountNamespace": 4026532231,
    "processName": "systemd-network",
    "hostName": "ip-10-100-1-217",
    "eventId": 41,
    "eventName": "socket",
    "stackAddresses": [
      139853228042507,
      93935071185801,
      93935080775184
    ],
    "argsNum": 3,
    "returnValue": 15,
    "args": "[{'name': 'domain', 'type': 'int', 'value': 'AF_UNIX'}, {'name': 'type', 'type': 'int', 'value': 'SOCK_DGRAM|SOCK_CLOEXEC'}, {'name': 'protocol', 'type': 'int', 'value': 0}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.051434,
    "processId": 1,
    "threadId": 1,
    "parentProcessId": 0,
    "userId": 0,
    "mountNamespace": 4026531840,
    "processName": "systemd",
    "hostName": "ip-10-100-1-217",
    "eventId": 1005,
    "eventName": "security_file_open",
    "stackAddresses": [
      140362867191588,
      8103505641674584000
    ],
    "argsNum": 4,
    "returnValue": 0,
    "args": "[{'name': 'pathname', 'type': 'const char*', 'value': '/proc/382/cgroup'}, {'name': 'flags', 'type': 'int', 'value': 'O_RDONLY|O_LARGEFILE'}, {'name': 'dev', 'type': 'dev_t', 'value': 5}, {'name': 'inode', 'type': 'unsigned long', 'value': 38584}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.051481,
    "processId": 1,
    "threadId": 1,
    "parentProcessId": 0,
    "userId": 0,
    "mountNamespace": 4026531840,
    "processName": "systemd",
    "hostName": "ip-10-100-1-217",
    "eventId": 257,
    "eventName": "openat",
    "stackAddresses": [],
    "argsNum": 4,
    "returnValue": 17,
    "args": "[{'name': 'dirfd', 'type': 'int', 'value': -100}, {'name': 'pathname', 'type': 'const char*', 'value': '/proc/382/cgroup'}, {'name': 'flags', 'type': 'int', 'value': 'O_RDONLY|O_CLOEXEC'}, {'name': 'mode', 'type': 'int', 'value': 3335958308}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.051522,
    "processId": 1,
    "threadId": 1,
    "parentProcessId": 0,
    "userId": 0,
    "mountNamespace": 4026531840,
    "processName": "systemd",
    "hostName": "ip-10-100-1-217",
    "eventId": 5,
    "eventName": "fstat",
    "stackAddresses": [
      140362867189385
    ],
    "argsNum": 2,
    "returnValue": 0,
    "args": "[{'name': 'fd', 'type': 'int', 'value': 17}, {'name': 'statbuf', 'type': 'struct stat*', 'value': '0x7FFE8293A360'}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.051635,
    "processId": 1,
    "threadId": 1,
    "parentProcessId": 0,
    "userId": 0,
    "mountNamespace": 4026531840,
    "processName": "systemd",
    "hostName": "ip-10-100-1-217",
    "eventId": 3,
    "eventName": "close",
    "stackAddresses": [
      140362867213483
    ],
    "argsNum": 1,
    "returnValue": 0,
    "args": "[{'name': 'fd', 'type': 'int', 'value': 17}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.051935,
    "processId": 1,
    "threadId": 1,
    "parentProcessId": 0,
    "userId": 0,
    "mountNamespace": 4026531840,
    "processName": "systemd",
    "hostName": "ip-10-100-1-217",
    "eventId": 1005,
    "eventName": "security_file_open",
    "stackAddresses": [
      140362867191588,
      8103505641674584000
    ],
    "argsNum": 4,
    "returnValue": 0,
    "args": "[{'name': 'pathname', 'type': 'const char*', 'value': '/proc/379/cgroup'}, {'name': 'flags', 'type': 'int', 'value': 'O_RDONLY|O_LARGEFILE'}, {'name': 'dev', 'type': 'dev_t', 'value': 5}, {'name': 'inode', 'type': 'unsigned long', 'value': 38586}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.05197,
    "processId": 1,
    "threadId": 1,
    "parentProcessId": 0,
    "userId": 0,
    "mountNamespace": 4026531840,
    "processName": "systemd",
    "hostName": "ip-10-100-1-217",
    "eventId": 257,
    "eventName": "openat",
    "stackAddresses": [],
    "argsNum": 4,
    "returnValue": 17,
    "args": "[{'name': 'dirfd', 'type': 'int', 'value': -100}, {'name': 'pathname', 'type': 'const char*', 'value': '/proc/379/cgroup'}, {'name': 'flags', 'type': 'int', 'value': 'O_RDONLY|O_CLOEXEC'}, {'name': 'mode', 'type': 'int', 'value': 3335958308}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.051995,
    "processId": 1,
    "threadId": 1,
    "parentProcessId": 0,
    "userId": 0,
    "mountNamespace": 4026531840,
    "processName": "systemd",
    "hostName": "ip-10-100-1-217",
    "eventId": 5,
    "eventName": "fstat",
    "stackAddresses": [],
    "argsNum": 2,
    "returnValue": 0,
    "args": "[{'name': 'fd', 'type': 'int', 'value': 17}, {'name': 'statbuf', 'type': 'struct stat*', 'value': '0x7FFE8293A360'}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.05211,
    "processId": 1,
    "threadId": 1,
    "parentProcessId": 0,
    "userId": 0,
    "mountNamespace": 4026531840,
    "processName": "systemd",
    "hostName": "ip-10-100-1-217",
    "eventId": 3,
    "eventName": "close",
    "stackAddresses": [],
    "argsNum": 1,
    "returnValue": 0,
    "args": "[{'name': 'fd', 'type': 'int', 'value': 17}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.052203,
    "processId": 379,
    "threadId": 379,
    "parentProcessId": 1,
    "userId": 100,
    "mountNamespace": 4026532231,
    "processName": "systemd-network",
    "hostName": "ip-10-100-1-217",
    "eventId": 3,
    "eventName": "close",
    "stackAddresses": [
      139853227968939
    ],
    "argsNum": 1,
    "returnValue": 0,
    "args": "[{'name': 'fd', 'type': 'int', 'value': 15}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.052246,
    "processId": 382,
    "threadId": 382,
    "parentProcessId": 1,
    "userId": 101,
    "mountNamespace": 4026532232,
    "processName": "systemd-resolve",
    "hostName": "ip-10-100-1-217",
    "eventId": 3,
    "eventName": "close",
    "stackAddresses": [
      140159195548039
    ],
    "argsNum": 1,
    "returnValue": 0,
    "args": "[{'name': 'fd', 'type': 'int', 'value': 15}]",
    "sus": 0,
    "evil": 0
  },
  {
    "timestamp": 129.052418,
    "processId": 382,
    "threadId": 382,
    "parentProcessId": 1,
    "userId": 101,
    "mountNamespace": 4026532232,
    "processName": "systemd-resolve",
    "hostName": "ip-10-100-1-217",
    "eventId": 1005,
    "eventName": "security_file_open",
    "stackAddresses": [
      140159195545259,
      8387231030874826000
    ],
    "argsNum": 4,
    "returnValue": 0,
    "args": "[{'name': 'pathname', 'type': 'const char*', 'value': '/run/systemd/netif/links/5'}, {'name': 'flags', 'type': 'int', 'value': 'O_RDONLY|O_LARGEFILE'}, {'name': 'dev', 'type': 'dev_t', 'value': 25}, {'name': 'inode', 'type': 'unsigned long', 'value': 521}]",
    "sus": 0,
    "evil": 0
  }
].map((dataRow) => {
  return {
    ...dataRow,
    timestamp: dataRow.timestamp + ((+ new Date)/1000) - (60*60*24*30),
    isAnomaly: (Math.random() > .5),
  }
});

export default dataSet;
