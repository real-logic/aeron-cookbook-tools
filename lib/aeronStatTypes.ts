/*
 * Copyright 2020-2021 Shaun Laurens
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type AeronStatRecommendation = {
    level : string;
    message : string;
    weight : number
}

export type AeronStatOutput = {
    mediaDriverRunning: string,
    mediaDriverRunningFlag: boolean,
    topLevelAeronStats? :TopLevelAeronStats, 
    errorCount : number,
    recomendations : AeronStatRecommendation[],
    sendSockets : SendSocket[],
    receiveSockets : ReceiveSocket[],
    featuresDetected: AeronStatFeatureDetected[],
    aeronStatPublications : AeronStatPublication[],
    aeronStatSubscriptions : AeronStatSubscription[],
    internalFlows : AeronStatInternalFlow[],
    clusterData? : AeronClusterDetails
  }

  export type AeronChannel = {
      success: boolean,
    channel: string,
    media: string,
    sections: AeronChannelSection[],
  }

  export type AeronChannelSection = {
      order: number,
      key: string,
      value: string,
  }

  export type TopLevelAeronStats = {
    bytesSent : number,
    bytesReceived : number,
    failedOffersToReceiverProxy : number,
    failedOffersToSenderProxy   : number,
    failedOffersToDriverConductorProxy  : number,
    naksSent    : number,
    naksReceived    : number,
    statusMessagesSent  : number,
    statusMessagesReceived : number,
    heartbeatsSent : number,
    heartbeatsReceived : number,
    retransmitsSent : number,
    flowControlUnderRuns : number,
    flowControlOverRuns : number,
    invalidPackets : number,
    errors : number,
    shortSends : number,
    failedAttemptsToFreeLogBuffers : number,
    backPressureEvents : number,
    unblockedPublications : number,
    unblockedControlCommands : number,
    possibleTtlAsymmetry : number,
    lossGapFills : number,
    clientLivenessTimeouts : number,  
    conductorMaxCycleTime : number,
    conductorMaxCycleTimeSeconds : number,
    conductorWorkCycleExceededCount : number,
    nameResolutionCount : number,
    currentResolvedHost : string,
    connectedAeronClients : number,
}

export enum AeronStatFeatureDetected {
    AERON_UDP,
    AERON_IPC,
    AERON_ARCHIVE_SERVER,
    AERON_CLUSTER,
    ARTIO,
    NONE
}



export const clusterElectionStateValues = new Map<string, string>([
    ["0", "Init"],
    ["1", "Canvass"],
    ["2", "Nominate"],
    ["3", "Candidate Ballot"],
    ["4", "Follower Ballot"],
    ["5", "Leader Log Replication"],
    ["6", "Leader Replay"],
    ["7", "Leader Init"],
    ["8", "Leader Ready"],
    ["9", "Follower Log Replication"],
    ["10", "Follower Replay"],
    ["11", "Follower Catchup Init"],
    ["12", "Follower Catchup Await"],
    ["13", "Follower Catchup"],
    ["14", "Follower Log Init"],
    ["15", "Follower Log Await"],
    ["16", "Follower Replay"],
    ["17", "Closed"],
  ]); 

export const clusterNodeRoleValues = new Map<string, string>([
    ["0", "Follower"],
    ["1", "Candidate"],
    ["2", "Leader"]
  ]); 

export const consensusModuleStateValues = new Map<string, string>([
    ["0", "Initializing"],
    ["1", "Active"],
    ["2", "Suspended"],
    ["3", "Snapshot"],
    ["4", "Quitting"],
    ["5", "Terminating"],
    ["6", "Closed"]
  ]); 

export const defaultStreams = new Map<string, string>([
    ["1", "Artio Inbound"],
    ["2", "Artio Outbound"],
    ["3", "Artio Replay"],
    ["10", "Archive Control Req"],
    ["20", "Archive Control Resp"],
    ["30", "Archive Recording Events"],
    ["100", "Log Stream"],
    ["101", "Cluster Ingress"],
    ["102", "Cluster Egress"],
    ["103", "Replay Stream"],
    ["104", "Clustered Service"],
    ["105", "Consensus Module"],
    ["106", "Clustered Service Snapshot"],
    ["107", "Consensus Module Snapshot"],
    ["108", "Consensus Stream"]
  ]); 


export type AeronClusterDetails = {
    likelyClusterStat : boolean, 
    electionState? : string,
    nodeRole? : string,
    consensusModuleState? : string,
    timedOutClientCount : string,
    clusterContainerErrors : string,
    clusterErrors : string,
    snapshotCount : string,
    clusterCommitPos : string,
}

export type AeronStatPublication = {
    channel : string,
    channelParsed : AeronChannel,
    sessionId : string,
    streamId : string,
    mystery : string,
    pubLimit : string,
    pubPositionSampled : string,
    pubPositionSampledNumeric : number,
    sendPosition : string,
    sendPositionNumeric : number,
    sendLimit :     string,
    sendBackPressureEvents : string
}

export type AeronStatSubscription = {
    channel : string,
    channelParsed : AeronChannel,
    sessionId : string,
    streamId : string,
    mystery : string,
    subPosition : string,
    subPositionNumeric : number,
    receivePosition : string,
    receivePositionNumeric : number,
    receiveHighWatermark : string,
    recordingPosition : string
}

export type AeronStatInternalFlow = {
    channel : string,
    channelParsed : AeronChannel,
    sessionId : string,
    streamId : string,
    mystery : string,
    pubLimit : string,
    pubPositionSampled : string,
    sendPosition : string,
    sendLimit :     string,
    sendBackPressureEvents : string
    subPosition : string,
    receivePosition : string,
    receiveHighWatermark : string,
    recordingPosition : string,
    diff : string
}

export type SendSocket = {
    hostAndPort : string,
    channel : string,
}

export type ReceiveSocket = {
    hostAndPort : string,
    channel : string,
}

export type AeronStatParsed = {
    pid : number,
    timestamp : string,
    heartbeatAgeMs: number,
    topLevelAeronStats? : TopLevelAeronStats,
    aeronStatFeaturesDetected : AeronStatFeatureDetected[],
    aeronStatPublications : AeronStatPublication[],
    aeronStatSubscriptions : AeronStatSubscription[],
    sendSockets : SendSocket[],
    receiveSockets : ReceiveSocket[],
    internalFlows : AeronStatInternalFlow[],
    error : string,
    clusterData? : AeronClusterDetails
}