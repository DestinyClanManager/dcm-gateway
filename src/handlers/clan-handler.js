import * as groupService from '../services/group-service'
import * as notesService from '../services/notes-service'
import { getActivity } from '../services/activity-service'
import sort from 'fast-sort'

export async function getMembersInClan(clanId) {
  return await groupService.getMembersOfGroup(clanId)
}

export async function getInactiveMembers(clanId) {
  const activity = await getActivity(clanId)
  return sort(activity).desc([p => p.daysSinceLastPlayed])
}

export async function kickMember(clanId, membershipType, membershipId, bearerToken) {
  return await groupService.kickMemberFromGroup(clanId, membershipType, membershipId, bearerToken)
}

export async function getPendingMembers(clanId, authToken) {
  return await groupService.getPendingMembersOfGroup(clanId, authToken)
}

export async function getInvitedMembers(clanId, authToken) {
  return await groupService.getInvitedMembersForGroup(clanId, authToken)
}

export async function approveMembershipRequests(clanId, memberships, authToken) {
  return await groupService.approvePendingForList(clanId, memberships, authToken)
}

export async function denyMembershipRequests(clanId, memberships, authToken) {
  return await groupService.denyPendingForList(clanId, memberships, authToken)
}

export async function rescindInvitation(clanId, membershipType, membershipId, authToken) {
  return await groupService.cancelGroupInvite(clanId, membershipType, membershipId, authToken)
}

export async function addNoteForMember(clanId, membershipId, note) {
  return await notesService.addNoteForMember(clanId, membershipId, note)
}

export async function getNotesForMember(clanId, membershipId) {
  return await notesService.getNotesForMember(clanId, membershipId)
}

export async function invite(clanId, membership, message, authToken) {
  return await groupService.inviteMemberToGroup(clanId, membership, message, authToken)
}

export async function changeMemberType(clanId, membership, authToken) {
  const { membershipType, membershipId, memberType } = membership
  return await groupService.changeMemberType(clanId, membershipType, membershipId, memberType, authToken)
}

export async function getBannedMembers(clanId, authToken) {
  return await groupService.getBannedMembersOfGroup(clanId, authToken)
}

export async function unbanMember(clanId, membership, authToken) {
  const { membershipType, membershipId } = membership
  return await groupService.unbanMember(clanId, membershipType, membershipId, authToken)
}

export async function banMember(clanId, membership, authToken) {
  const { membershipType, membershipId } = membership
  return await groupService.banMember(clanId, membershipType, membershipId, authToken)
}
